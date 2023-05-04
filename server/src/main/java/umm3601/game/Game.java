package umm3601.game;

import org.mongojack.Id;
import org.mongojack.ObjectId;

@SuppressWarnings({"VisibilityModifier"})
public class Game {

  @ObjectId @Id

  @SuppressWarnings({"MemberName"})
  public String _id;

  public int Year;
  public String Game;
  public String Genre;
  public String Publisher;
  public String originalPlatforms;

  public String title;
  public String genre;
  public String platform;
  public String publisher;
  public String developer;
  public int releaseYear;
  public String contentRating;
  public int unitsSold;
  public double totalRevenue;


}
