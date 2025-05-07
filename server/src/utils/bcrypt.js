import bcrypt from 'bcryptjs';

const saltRound = 10;
export const encrypt = password => bcrypt.hashSync(password, saltRound);


export const compare = (password, hash) => bcrypt.compareSync(password, hash);
