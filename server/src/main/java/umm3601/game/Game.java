package umm3601.game;

import org.mongojack.Id;
import org.mongojack.ObjectId;

@SuppressWarnings({"VisibilityModifier"})
public class Game {

  @ObjectId @Id

  @SuppressWarnings({"MemberName"})
  public String _id;

  public int releaseYear;
  public String title;
  public String genre;
  public String publisher;
  public String platform;

  //public String developer;
  //public String contentRating;
  //public int unitsSold;
  //public double totalRevenue;


}
