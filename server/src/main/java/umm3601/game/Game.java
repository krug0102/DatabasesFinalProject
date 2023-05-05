package umm3601.game;

import org.mongojack.Id;
import org.mongojack.ObjectId;

@SuppressWarnings({"VisibilityModifier"})
public class Game {

  @ObjectId @Id

  @SuppressWarnings({"MemberName"})
  public String _id;

  public int gameYear;
  public String gameGame;
  public String gameGenre;
  public String gamePublisher;
  public String gameoriginalPlatforms;


}
