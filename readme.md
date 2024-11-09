# Database Schema

- User (<ins>id, username</ins>, first_name, last_name, password)
- Language (<ins>name</ins>) <br>
- Question (<ins>q_id</ins>, name, link, posted_by, posted_time)
  - posted_by is the foreign key to User's id
- MarkQuestion (<ins>user_id, q_id</ins>, done) <br>
  - user_id is the foreign key to User's id
  - q_id is the foreign key to Question's q_id
- Solution (<ins>s_id</ins>, name, q_id, lang_name, posted_by, code, notes, posted_time, tc, sc)
  - q_id is the foreign key to Question's q_id
  - lang_name is the foreign key to Language's name
  - posted_by is the foreign key to User's id
