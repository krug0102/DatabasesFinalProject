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
  public String gameoriginalPlatforms;


}
