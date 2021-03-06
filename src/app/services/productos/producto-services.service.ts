import { Injectable }     from '@angular/core';
import { HttpClient}      from '@angular/common/http';
import { Observable , 
         throwError }     from 'rxjs';
import { Producto }       from '../../models/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoServicesService {

  private urlEnpomit : string = 'https://test-java-henry.herokuapp.com/api';
  
  constructor(private Http : HttpClient ) { }

  /**
   * Busqueda por Descripcion y marca
   * @param page  
   * @param candidate 
   */
  getProducts(page : number , candidate : string) : Observable<Producto[]> {
    return this.Http.get<Producto[]>(this.urlEnpomit +'/products/page/'+page+'?candidate=' + candidate);
  }

  /**
   * Busqueda por Id
   * @param producId 
   */
  getProductById(producId : number) : Observable<Producto[]> {
    return this.Http.get<Producto[]>(this.urlEnpomit +"/"+ producId);
  }

}
