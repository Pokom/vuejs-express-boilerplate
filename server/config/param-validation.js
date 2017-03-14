import Joi from 'joi';

export default {
  createUser: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  },

  updateUser: {
    params: {
      userId: Joi.string().hex().required()
    }
  },

  createRegion: {
    body: {
      name: Joi.string().required()
    }
  },

  updateRegion: {
    body: {
      name: Joi.string().required()
    }
  },
  createAlbum: {
    body: {
      name: Joi.string().required()
    }
  },
  updateAlbum: {
    body: {
      name: Joi.string().required()
    }
  },
  createListing: {
    body: {
      name: Joi.string().required()
    }
  },
  updateListing: {
    body: {
      name: Joi.string().required()
    }
  },
  createGenre: {
    body: {
      name: Joi.string().required()
    }
  },
  updateGenre: {
    body: {
      name: Joi.string().required()
    }
  },
  createArtist: {
    body: {
      name: Joi.string().required()
    }
  },
  updateArtist: {
    body: {
      name: Joi.string().required()
    }
  },
  createRecordLabel: {
    body: {
      name: Joi.string().required()
    }
  },

  updateRecordLabel: {
    body: {
      name: Joi.string().required()
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  }
};
