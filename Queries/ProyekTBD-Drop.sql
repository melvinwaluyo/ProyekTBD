BEGIN;

DROP VIEW IF EXISTS public."Book_List";
DROP VIEW IF EXISTS public."Customer_List";
DROP VIEW IF EXISTS public."Staff_List";
DROP VIEW IF EXISTS public."Sales_by_Store";

ALTER TABLE IF EXISTS public."Customer" DROP CONSTRAINT IF EXISTS "Customer_Address_Id_fk";
ALTER TABLE IF EXISTS public."Order" DROP CONSTRAINT IF EXISTS "Order_Inventory_Id_fk";
ALTER TABLE IF EXISTS public."Order" DROP CONSTRAINT IF EXISTS "Order_Customer_Id_fk";
ALTER TABLE IF EXISTS public."Book" DROP CONSTRAINT IF EXISTS "Book_Genre_Id_fk";
ALTER TABLE IF EXISTS public."Book" DROP CONSTRAINT IF EXISTS "Book_Language_Id_fk";
ALTER TABLE IF EXISTS public."Book" DROP CONSTRAINT IF EXISTS "Book_Publisher_Id_fk";
ALTER TABLE IF EXISTS public."Review" DROP CONSTRAINT IF EXISTS "Review_Book_Id_fk";
ALTER TABLE IF EXISTS public."Review" DROP CONSTRAINT IF EXISTS "Review_Customer_Id_fk";
ALTER TABLE IF EXISTS public."Book_Author" DROP CONSTRAINT IF EXISTS "Book_Author_Book_Id_fk";
ALTER TABLE IF EXISTS public."Book_Author" DROP CONSTRAINT IF EXISTS "Book_Author_Author_Id_fk";
ALTER TABLE IF EXISTS public."Inventory" DROP CONSTRAINT IF EXISTS "Inventory_Book_Id_fk";
ALTER TABLE IF EXISTS public."Inventory" DROP CONSTRAINT IF EXISTS "Inventory_Store_Id_fk";
ALTER TABLE IF EXISTS public."Staff" DROP CONSTRAINT IF EXISTS "Staff_Store_Id_fk";
ALTER TABLE IF EXISTS public."Staff" DROP CONSTRAINT IF EXISTS "Staff_Address_Id_fk";
ALTER TABLE IF EXISTS public."Address" DROP CONSTRAINT IF EXISTS "Address_City_Id_fk";
ALTER TABLE IF EXISTS public."City" DROP CONSTRAINT IF EXISTS "City_Country_Id_fk";

DROP TABLE IF EXISTS public."Review";
DROP TABLE IF EXISTS public."Order";
DROP TABLE IF EXISTS public."Inventory";
DROP TABLE IF EXISTS public."Book_Author";
DROP TABLE IF EXISTS public."Book";
DROP TABLE IF EXISTS public."Staff";
DROP TABLE IF EXISTS public."Store";
DROP TABLE IF EXISTS public."Customer";
DROP TABLE IF EXISTS public."Publisher";
DROP TABLE IF EXISTS public."Author";
DROP TABLE IF EXISTS public."Genre";
DROP TABLE IF EXISTS public."Language";
DROP TABLE IF EXISTS public."Address";
DROP TABLE IF EXISTS public."City";
DROP TABLE IF EXISTS public."Country";

END;
