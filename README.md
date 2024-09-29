# This contains basic PostgresSQL operation using express

```
SELECT * FROM users;
SELECT * FROM users WHERE id=$1;
INSERT INTO users(email, username, password)
        VALUES ($1, $2 ,$3)
        RETURNING *;
DELETE FROM users WHERE id=$1 RETURNING *;
```
