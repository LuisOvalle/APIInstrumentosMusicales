# APIInstrumentosMusicales
API para el crud de instrumentos musicales

La API la tengo en el puerto 3000, el front end lo tengo en el 4200

ruta de ejemplo: http://localhost:3000/api/v1/instrumentosMusicales

8/10/2019: los instrumentos estan en una variable local, no en archivo

Ejemplo de consumo:
Create/Post:
    {
        "nombre": "Piano7",
        "marca": "Yamaha",
        "clasificacion": "de teclado",
        "precio": 1000,
        "descripcion": "Piano clasico eléctrico P-45"
    }

Read one / Get:
    http://localhost:3000/api/v1/instrumentosMusicales/1

Read all / Get:
    http://localhost:3000/api/v1/instrumentosMusicales/

Update:
    se considera que todos los campos son necesarios, todos estan validados.

    http://localhost:3000/api/v1/instrumentosMusicales/1

    {
        "nombre": "Piano Clasico",
        "marca": "Yamaha",
        "clasificacion": "de teclado",
        "precio": 9999.99,
        "descripcion": "Piano clasico eléctrico P-45"
    }

Delete:
    http://localhost:3000/api/v1/instrumentosMusicales/2


dev:
npm run monitor


test:
npm test
npm run coverage
