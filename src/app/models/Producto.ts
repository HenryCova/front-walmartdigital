export class Producto{
    id          :string;
    nombre      :string;
    brand       :string;
    description :string;
    image       :string;
    price       :number;

}

function  getImage(){
    return "https://" + this.image;
}