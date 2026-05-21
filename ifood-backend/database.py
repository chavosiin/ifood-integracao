import oracledb

def conectar():

    connection = oracledb.connect(
        user="test",
        password="teste",
        host="teste",
        port=1521,
        service_name="teste"
    )

    return connection