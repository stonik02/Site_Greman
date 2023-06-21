import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { TokenService } from 'src/modules/token/token.service'
import { ROLES_KEY } from './has-roles.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(
		private readonly jwtService: TokenService,
		private reflector: Reflector,
	) {}

	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		try {
			const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
				context.getHandler(),
				context.getClass(),
			])
			if (!requiredRoles) {
				return true
			}
			const req = context.switchToHttp().getRequest()
			const authHeader = req.headers.authorization
			const bearer = authHeader.split(' ')[0]
			const token = authHeader.split(' ')[1]
			console.log(requiredRoles[0])

			if (bearer !== 'Bearer' || !token) {
				throw new UnauthorizedException({
					message: 'У пользователя недостаточно прав',
				})
			}
			return this.jwtService
				.verifyAccessToken(token)
				.then((user) => {
					req.user = user.user
					let role = 1
					const userRole = user.user.roleId
					if (requiredRoles[0] == 'admin') {
						role = 2
					}
					if (userRole == role) {
						return true
					} else {
						throw new UnauthorizedException({
							message: 'У пользователя недостаточно прав',
						})
					}
					// return user.role.some(role => requiredRoles.includes(role.value));
				})
				.catch((e) => {
					console.log(e)
					throw new UnauthorizedException({
						message: 'У пользователя недостаточно прав',
					})
				})
		} catch (e) {
			throw new UnauthorizedException({
				message: 'У пользователя недостаточно прав',
			})
		}
	}
}
