import { Injectable, OnApplicationBootstrap } from '@nestjs/common'
import { UserService } from './user.service'
import { Role } from '../../common/enums/role.enum'

@Injectable()
export class UserSeedService implements OnApplicationBootstrap {
  constructor(private readonly userService: UserService) {}

  async onApplicationBootstrap() {
    await this.seedAdminUser()
  }

  async seedAdminUser() {
    try {
      const adminExists = await this.userService.findByUsername('administrador')

      if (!adminExists) {
        await this.userService.create(
          'administrador',
          'admin@dunamis.com',
          'admin123456',
          Role.ADMIN,
        )
        console.log('✓ Usuário administrador criado com sucesso!')
      }
    } catch (error) {
      console.error('Erro ao criar usuário administrador:', error.message)
    }
  }
}
