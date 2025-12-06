//Todo esto se hizo directamente en la pestaña validations de MongoDB Compass
//por tanto seguira ese mismo formato

//Validacion de las entradas en la coleccion Producto (Schema)
db.runCommand({
    validator: {
    $jsonSchema: {
        bsonType: 'object',
        required: [
        '_id',
        'about_product',
        'actual_price',
        'category',
        'discount_percentage',
        'discounted_price',
        'img_link',
        'product_id',
        'product_link',
        'product_name',
        'rating',
        'review_content',
        'review_id',
        'review_title',
        'user_id',
        'user_name'
        ],
        properties: {
        _id: {
            bsonType: 'objectId'
        },
        about_product: {
            bsonType: 'string',
            description: 'Descripcion general del producto'
        },
        actual_price: {
            bsonType: 'string',
            description: 'Contiene el signo de la moneda'
        },
        category: {
            bsonType: 'string'
        },
        discount_percentage: {
            bsonType: 'string',
            pattern: '^\\d+%$',
            description: 'String porque contiene el signo de porcentaje'
        },
        discounted_price: {
            bsonType: 'string',
            description: 'Es un string porque necesita el signo de porcentaje'
        },
        img_link: {
            bsonType: 'string',
            pattern: '^https:\\/\\/m\\.media-amazon\\.com\\/images\\/$',
            description: 'Asegura que el string del link tenga este formato hasta images/'
        },
        product_id: {
            bsonType: 'string',
            description: 'El id esta conformado por letras'
        },
        product_link: {
            bsonType: 'string',
            pattern: '^https:\\/\\/www\\.amazon\\.in\\/$',
            description: 'Se asegura que el link cumpla con el formato, asegurando que sea un link de amazon'
        },
        product_name: {
            bsonType: 'string'
        },
        rating: {
            bsonType: [
            'double',
            'int'
            ],
            description: 'Acepta ambos tipos de datos en el caso que el rating sea entero'
        },
        rating_count: {
            bsonType: [
            'string',
            'int'
            ],
            description: 'Acepta ambos tipos de datos en el caso que el rating sea entero'
        },
        review_content: {
            bsonType: 'string'
        },
        review_id: {
            bsonType: 'string'
        },
        review_title: {
            bsonType: 'string'
        },
        user_id: {
            bsonType: 'string'
        },
        user_name: {
            bsonType: 'string'
        }
        }
    }
    }, 
    validationAction: "warn"

});
//Validacion de las entradas en la coleccion de sales (Schema)
db.runCommand({
  $jsonSchema: {
    bsonType: 'object',
    required: [
      '_id',
      'customer_email',
      'items',
      'sale_date',
      'total_amount'
    ],
    properties: {
      _id: {
        bsonType: 'objectId'
      },
      customer_email: {
        bsonType: 'string'
      },
      items: {
        bsonType: 'array',
        items: {
          bsonType: 'object',
          properties: {
            price_at_moment: {
              bsonType: 'int'
            },
            product_id: {
              bsonType: 'string'
            },
            quantity: {
              bsonType: 'int'
            }
          },
          required: [
            'price_at_moment',
            'product_id',
            'quantity'
          ]
        }
      },
      sale_date: {
        bsonType: 'date'
      },
      total_amount: {
        bsonType: 'int'
      }
    }
  }, 
  validationAction: "warn"
});