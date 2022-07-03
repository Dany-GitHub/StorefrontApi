CREATE TABLE orders
(
    id           SERIAL PRIMARY KEY,
    order_status VARCHAR(50),
    user_id      BIGINT REFERENCES users (id)
);