CREATE OR REPLACE FUNCTION registro_bitacora()
RETURNS trigger as
$BODY$
begin
    INSERT INTO bitacora(date, time, usuario)
    VALUES(default current_date, default current_time, NEW.modified_by);
	RETURN NEW;
END;
$BODY$
LANGUAGE 'plpgsql'
;

CREATE TRIGGER registrar
AFTER INSERT or UPDATE OR DELETE
ON track
FOR EACH ROW
EXECUTE PROCEDURE registro_bitacora();