import bcrypt from "bcryptjs";

export async function hashPassword(password) {
    let res = ''
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log(password, hashedPassword); // This will log the correct hashed password
        res = hashedPassword
    } catch (err) {
        console.error(err);
    }
    return res
}

export async function compareHashAndPassword(password, hashedPassword) {
    let res = false
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        if (isMatch) {
            console.log('Encrypted password is:', password);
            console.log('Decrypted password is:', hashedPassword);
            res = true;
        } else {
            console.log(hashedPassword + ' is not encryption of ' + password);
            res = false;
        }
    } catch (err) {
        console.error('Error comparing passwords:', err);
        throw err;
    }
    return res
}
