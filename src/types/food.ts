interface Food {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    quantity?: number;
}

export default Food;
