import { Component, OnInit , Input} from '@angular/core';
import { ProductoServicesService }  from '../services/productos/producto-services.service';
import { Producto }                 from '../models/producto';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  public productos        : Producto[] ;
  public palindromo       : boolean = false;
  @Input() candidateBase  : string ;
  public pageContex       : any ;
  public first            : boolean = true;
  public last             : boolean= false;
  public pageNumber       : number = 0;
  public existProd        : boolean = false;
  public alerta           :boolean = false;
  public error           :boolean = false;
  

  constructor(private productoServices : ProductoServicesService) { }

  ngOnInit(): void {
    let vm = this;

    vm.first= true;
    vm.last= false;
    vm.palindromo = false;
    vm.isPalindromo(vm.candidateBase);

    if(!Number( vm.candidateBase)){
      vm.buscarProducto(0,vm.candidateBase? vm.candidateBase: "" );
    }else{
      vm.buscarProductoId(Number(vm.candidateBase));
    }
    
  }

  /**
   * Llamado al servicio back que busca los productos por  :
   * Marca
   * Descripcion
   * @param productId 
   */
  private buscarProducto(page : number , candidate : string){
    let vm = this;
    vm.productoServices.getProducts(page , candidate ).subscribe(
      (response : any) =>{
        vm.contextPage(response);
      },
      (error) =>{
        vm.error= true;
        vm.sleep(3000);
      });
  }

  /**
   * Llamado al servicio back que busca el producto por Id
   * @param productId 
   */
  private buscarProductoId(productId : number){
    let vm = this;

    vm.productoServices.getProductById(productId).subscribe(
      (response : any) =>{
        vm.contextPage(response);
      },
      (error) =>{
        vm.error= true;
        vm.sleep(3000);
      });
      
  }

  /**
   * Carga los valores con los que funciona el paginator y el como se muestran los productos
   * @param response 
   */
  private contextPage(response : any){
    let vm = this;

    vm.pageContex = response;
    vm.productos = response.content  as Producto[];
    vm.existProd = vm.productos.length ? true : false;
    
    vm.last = vm.pageContex.last;
    vm.first =  vm.pageContex.first;
    vm.pageNumber =  vm.pageContex.pageable.pageNumber 

    if(!vm.existProd){
      vm.alerta =true;
      vm.sleep(3000);
    }

  }

  sleep(tiempo : number){
    setTimeout(() => {
      this.alerta = false;
      this.error  = false;
    }, tiempo);
  }

  /**
   * Avanza a la siguiente pagina
   */
  proximo(){
    if(!this.pageContex.last){
      this.buscarProducto(this.pageContex.pageable.pageNumber + 1,this.candidateBase? this.candidateBase: "" );
    }
  }

  /**
   * retocede una pagina 
   */
  anterior(){
    if(!this.pageContex.first){
      this.buscarProducto(this.pageContex.pageable.pageNumber - 1, this.candidateBase? this.candidateBase: "" );
    }
  }

  /**
   * Evalua un string si es Palindromo, elimina los espacios en blancos
   * Salida:
   * True Palindromo
   * False No Palindromo
   * @param palabra 
   */
  private isPalindromo(palabra : string){
  if(palabra){
    palabra=palabra.replace(/ /g, "");
 
    for (var i=0;i<palabra.length;i++){
      if(palabra[i]!=palabra[palabra.length-i-1]){     
        this.palindromo= false;
        return "";
      }
    }  
    this.palindromo = true;
    return "";
  }
}

/**
 * Recibe un numero y lo retorna con el formato de :
 * separador en miles "." (punto)
 * separador decimales "," (coma)
 * @param params 
 */
formatearMoneda(params:number) {
  return new Intl.NumberFormat(["ban", "id"]).format( params);
}

}
