# Welcome to MOVIE_AUTH project. 

Main features:
* Use of passport (local-strategy) - login/register
* Routes validation


Accessible routes:
   * `/` - main page with two links(login/register)
   * `/403` - auto-redirect if user tries to access certain pages without logging in
   * `/404` - auto-redirect if wrong address was put in

   * `/users` - access to list of users in database
      * `/login` - login page
      * `/register` - register page
      * `/profile` - user can change their name, email, and password
   
   * `/movies` - displays all movies in database. User have options to access their profile, access their favorites, add a movie to database, search for title(partial string search supported), search movies by genre.
      * `/getmovie` - displays found movie(option to update information fo found movie)
         * `/updatemovie` - display form with pre-filled values for easier editing. 
      * `/addmovie` - displays form to add a movie
      * `/favorites` - displays all movies added by user to their favorites(option to remove from favorites)
      *`/filteredbygenre` - display all movies in searched genre
      * `/logout` - logs out current user and destroys session

   