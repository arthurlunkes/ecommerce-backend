import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from './user.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(username: string, password: string) {
    const user = await this.userService.findByUsername(username)

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado')
    }

    const isPasswordValid = await this.userService.validatePassword(
      password,
      user.password,
    )

    if (!isPasswordValid) {
      throw new UnauthorizedException('Senha inválida')
    }

    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    }

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    }
  }

  async validateUser(id: string) {
    return this.userService.findById(id)
  }
}
