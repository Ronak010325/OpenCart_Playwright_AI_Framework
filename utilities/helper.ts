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
            email: 'ronakyadav1325@gmail.com',
            password: 'ronak@1325',
        };
    }
}
