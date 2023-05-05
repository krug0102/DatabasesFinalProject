package umm3601.game;

import static com.mongodb.client.model.Filters.and;
import static com.mongodb.client.model.Filters.eq;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Accumulators;
// import com.mongodb.client.model.Sorts;
// import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.model.Aggregates;
import com.mongodb.client.model.Projections;
import com.mongodb.client.model.Sorts;

import org.bson.Document;
import org.bson.UuidRepresentation;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;
import org.mongojack.JacksonMongoCollection;

import io.javalin.http.BadRequestResponse;
import io.javalin.http.Context;
import io.javalin.http.NotFoundResponse;

public class GameController {

  private static final String GAME_KEY = "gameGame";
  private static final String YEAR_KEY = "gameYear";
  private static final String GENRE_KEY = "gameGenre";


  private final JacksonMongoCollection<Game> gameCollection;

  public GameController(MongoDatabase database) {
    gameCollection = JacksonMongoCollection.builder().build(
        database,
        "games",
        Game.class,
        UuidRepresentation.STANDARD);
  }

  public void getAllGames(Context ctx) {
    Bson combinedFilter = constructFilter(ctx);
    Bson sortingOrder = constructSortingOrder(ctx);

    // All three of the find, sort, and into steps happen "in parallel" inside the
    // database system. So MongoDB is going to find the products with the specified
    // properties, return those sorted in the specified manner, and put the
    // results into an initially empty ArrayList.
    ArrayList<Game> matchingProducts = gameCollection
        .find(combinedFilter)
        .sort(sortingOrder)
        .into(new ArrayList<>());

    // Set the JSON body of the response to be the list of products returned by
    // the database.
    ctx.json(matchingProducts);
  }

  public void getGame(Context ctx) {
    String id = ctx.pathParam("id");
    Game game;

    try {
      game = gameCollection.find(eq("_id", new ObjectId(id))).first();
    } catch (IllegalArgumentException e) {
      throw new BadRequestResponse("The requested game id wasn't a legal Mongo Object ID.");
    }
    if (game == null) {
      throw new NotFoundResponse("The requested game was not found");
    } else {
      ctx.json(game);
    }
  }

  public void getGamesByGenre(Context ctx) {
    Bson combinedFilter = constructFilter(ctx);
    Bson sortingOrder = constructSortingOrder(ctx);

    ArrayList<GenreSortItem> output = gameCollection
        .aggregate(
            Arrays.asList(
                Aggregates.match(combinedFilter),
                Aggregates.sort(sortingOrder),
                Aggregates.group("$category",
                    Accumulators.sum("count", 1),
                    Accumulators.addToSet("products",
                        new Document("_id", "$_id")
                            .append("gameYear", "$gameYear")
                            .append("gameGame", "$gameGame")
                            .append("gameGenre", "$gameGenre")
                            .append("gamePublisher", "$gamePublisher")
                            .append("gameoriginalPlatforms", "$gameoriginalPlatforms"))),
                Aggregates.project(
                    Projections.fields(
                        Projections.computed("gameGenre", "$_id"),
                        Projections.excludeId())),
                Aggregates.sort(Sorts.ascending("_id"))),
            GenreSortItem.class)
        .into(new ArrayList<>());

    ctx.json(output);

  }

  private Bson constructSortingOrder(Context ctx) {
    // Sort the results. Use the `sortby` query param (default "PRODUCT_NAME_KEY")
    // as the field to sort by, and the query param `sortorder` (default
    // "asc") to specify the sort order.
    String sortBy = Objects.requireNonNullElse(ctx.queryParam("sortby"), GAME_KEY);
    String sortOrder = Objects.requireNonNullElse(ctx.queryParam("sortorder"), "asc");
    Bson sortingOrder = sortOrder.equals("desc") ? Sorts.descending(sortBy) : Sorts.ascending(sortBy);
    return sortingOrder;
  }

  public void getGames(Context ctx) {
    Bson combinedFilter = constructFilter(ctx);

    // All three of the find, sort, and into steps happen "in parallel" inside the
    // database system. So MongoDB is going to find the games with the specified
    // properties, return those sorted in the specified manner, and put the
    // results into an initially empty ArrayList.
    ArrayList<Game> matchingGames = gameCollection
      .find(combinedFilter)
      .into(new ArrayList<>());

    // Set the JSON body of the response to be the list of games returned by
    // the database.
    ctx.json(matchingGames);
  }

  private Bson constructFilter(Context ctx) {
    List<Bson> filters = new ArrayList<>(); // start with a blank document

    if (ctx.queryParamMap().containsKey(GENRE_KEY)) {
      filters.add(eq(GENRE_KEY, ctx.queryParam(GENRE_KEY)));
    }

    // Combine the list of filters into a single filtering document.
    Bson combinedFilter = filters.isEmpty() ? new Document() : and(filters);

    return combinedFilter;
  }

}
