CREATE TABLE order_products
(
    id         SERIAL PRIMARY KEY,
    quantity   INTEGER,
    product_id BIGINT REFERENCES products (id),
    order_id   BIGINT REFERENCES orders (id)
);