-- @block
BEGIN TRANSACTION;

INSERT INTO public."Language" ("Name") VALUES ('Indonesian');

-- @block
SELECT * FROM public."Language";

-- @block
ROLLBACK;

-- @block
COMMIT;