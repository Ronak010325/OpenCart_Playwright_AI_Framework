import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export class Helper {
    static convertPriceToNumber(price: string): number {
        const cleanedPrice = price.replace(/[^0-9.]/g, '');
        return Number(cleanedPrice);
    }

    static getProductDetails() {
        return {
            productName: 'MacBook',
            productQuantity: '1',
            totalPrice: '$602.00',
        };
    }

    static getLoginDetails() {
        return {
            email: process.env.ENDUSER_EMAIL,
            password: process.env.ENDUSER_PASSWORD,
        };
    }
}
