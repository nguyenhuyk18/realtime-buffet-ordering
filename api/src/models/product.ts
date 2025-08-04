class product {
    id : number = null;
    product_name : string = null;
    id_category : number = null;
    description : string = null;
    image : string = null;
    created_date : string = null;
    id_brand : number = null;
    type_buffet : string = null;
    name_brand : string = null;
    name_category : string = null;


    constructor(id : number = null , product_name : string = null , id_category : number = null , description : string = null , image : string = null , created_date : string = null , id_brand : number = null , type_buffet : string = null, name_brand : string = null, name_category : string = null) {
        this.id = id;
        this.product_name = product_name;
        this.id_category = id_category;
        this.description = description;
        this.image = image;
        this.created_date = created_date;
        this.id_brand = id_brand;
        this.type_buffet = type_buffet
        this.name_brand = name_brand;
        this.name_category = name_category;
    }

    // getId(): number {
    //     return this.id;
    // }

    // getProductName(): string {
    //     return this.product_name;
    // }

    // getIdCategory(): number {
    //     return this.id_category;
    // }
    
    // getDescription(): string {
    //     return this.description;
    // }

    // getImage(): string {
    //     return this.image;
    // }

    // getCreatedDate(): string {
    //     return this.created_date;
    // }

    // getIdBrand(): number {
    //     return this.id_brand;
    // }

    // setId(id: number): void {
    //     this.id = id;
    // }

    // setProductName(product_name: string): void {
    //     this.product_name = product_name;
    // }

    // setIdCategory(id_category: number): void {
    //     this.id_category = id_category;
    // }

    // setDescription(description: string): void {
    //     this.description = description;
    // }

    // setImage(image: string): void {
    //     this.image = image;
    // }

    // setCreatedDate(created_date: string): void {
    //     this.created_date = created_date;
    // }

    // setIdBrand(id_brand: number): void {
    //     this.id_brand = id_brand;
    // }
}

export default product;