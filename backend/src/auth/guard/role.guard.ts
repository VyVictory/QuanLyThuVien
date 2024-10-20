import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { error } from 'console'; // Import error function from console module
import { Observable } from 'rxjs'; // Import Observable class from rxjs module

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private roles: string[]) {} // Constructor nhận một mảng các vai trò

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const currentUser = request.currentUser; 

    if (!currentUser) {
      console.log('RolesGuard: No currentUser found'); 
      return false; 
    }

    const hasRole = this.roles.includes(String(currentUser.role)); 
    console.log('Has Role:', hasRole); 

    if (!error) { 
      console.log("error from role guard", error); 
    }
    
    return hasRole; 
  }
}
