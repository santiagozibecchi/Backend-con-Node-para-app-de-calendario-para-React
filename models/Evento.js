const { Schema, model } = require("mongoose");

const EventoSchema = Schema({

      title: {
            type: String,
            required: true
      },
      notes: {
            type: String
      },
      start: {
            type: Date,
            required: true
      },
      end: {
            type: Date,
            required: true
      },
      user: {
            // este tipo es una referencia que hace uso del Usuario
            type: Schema.Types.ObjectId,
            ref: 'Usuario',
            required: true
      }
});

EventoSchema.method('toJSON', function () {
      const { _id, __v, ...object } = this.toObject();
      object.id = _id;
      return object;
})

module.exports = model('Evento', EventoSchema);