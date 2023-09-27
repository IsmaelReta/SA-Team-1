const bcrypt = require('bcrypt');
const { User } = require('../models');
const transporter = require('../helpers');

const createUser = async (userData) => {
  try {
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    throw ('Error:', error);
  }
};
const getUserById = async (id) => {
  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
    return user;
  } catch (error) {
    throw ('Error:', error);
  }
};
const getUserByEmail = async (option) => {
  try {
    const user = await User.findOne({
      where: { email: option },
    });
    return user;
  } catch (error) {
    throw ('Error:', error);
  }
};
const createCode = async (email) => {
  try {
    const user = await getUserByEmail(email);
    let code = '';
    // me toma el ++ como error
    /* eslint-disable */
    for (let index = 0; index <= 5; index++) {
      const character = Math.ceil(Math.random() * 9);
      code += character;
    }
    /* eslint-enable */
    user.code = code;
    user.save();
    const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: blue ;
                background-size: cover;
                background-repeat: no-repeat;
                background-attachment: fixed;
                text-align: center;
            }
    
            .container {
                padding: 20px;
                background-color: rgba(255, 255, 255, 0.8); /* Fondo semi-transparente para mejorar la legibilidad */
                border-radius: 10px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                margin: 50px auto; /* Centrar verticalmente en la pantalla */
                max-width: 600px; /* Limitar el ancho del contenido */
            }
    
            h1 {
                color: #333; /* Cambia el color del título según tu preferencia */
            }
    
            h4 {
                color: red;
            }
    
            .boton {
                background-color: #007BFF; /* Cambia el color del botón según tu preferencia */
                color: #fff;
                padding: 10px 20px;
                text-decoration: none;
                border-radius: 5px;
            }
    
            .boton:hover {
                background-color: #0056b3; /* Cambia el color al pasar el mouse por encima */
            }
            b {
              color: white;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Necesitamos validar que usted está registrándose</h1>
            <h4>Si no es usted, verifique hacer un cambio de contraseña o extremar sus medidas de seguridad.</h4>
            <h3>Si es usted, por favor, vaya al siguiente link <a class="boton" href="http://localhost:4200/verificar-email/${user.email}/${user.code}"><b>verificar</b></a></h3>
        </div>
    </body>
    </html>
    `;

    const transporterSe = await transporter.sendMail({
      from: process.env.EMAIL,
      /* to:user.email, */
      to: user.email,
      subject: 'Código de valdiacion de email: ',
      html: htmlBody,
    });

    return transporterSe;
  } catch (error) {
    throw ('Error:', error);
  }
};

const validateCode = async (code, email) => {
  try {
    const user = await getUserByEmail(email);
    if (user.code !== code) {
      throw new Error('Error: incorrect code');
    }
    user.active = true;
    user.save();
    return user;
  } catch (error) {
    throw ('Error:', error);
  }
};
const getUsers = async () => {
  try {
    const options = {
      include: [{ all: true }],
      attributes: { exclude: ['password'] },
    };
    const users = await User.findAll(options);
    return users;
  } catch (error) {
    throw ('Error:', error);
  }
};

const updateUser = async (userId, userOptions) => {
  try {
    await getUserById(userId);
    await User.update(userOptions, { where: { id: userId } });
    return getUserById(userId);
  } catch (error) {
    throw ('Error:', error);
  }
};
const patchUser = async (userId, newPassword) => {
  try {
    const user = await User.findByPk(userId);
    user.password = newPassword.password;
    await user.save();
    return getUserById(userId);
  } catch (error) {
    throw ('Error:', error);
  }
};
const deleteUser = async (userId) => {
  try {
    return await User.update(
      { active: false },
      { where: { id: userId, active: true } },
    );
  } catch (error) {
    throw ('Error:', error);
  }
};
const validateUser = async (email, password) => {
  const userData = await getUserByEmail(email);
  const hashedPassword = userData.password;
  const match = await bcrypt.compare(password, hashedPassword);
  if (match) {
    try {
      const user = await User.findOne({
        where: { email, active: true },
      });
      if (user) {
        return user;
      }
      return false;
    } catch (error) {
      throw ('Error:', error);
    }
  } else {
    return false;
  }
};

module.exports = {
  createUser,
  deleteUser,
  getUserById,
  getUserByEmail,
  getUsers,
  updateUser,
  patchUser,
  validateUser,
  validateCode,
  createCode,
};
