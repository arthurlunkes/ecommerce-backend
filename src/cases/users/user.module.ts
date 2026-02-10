import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'
import { User } from './user.entity'
import { UserService } from './user.service'
import { AuthService } from './auth.service'
import { UserController } from './user.controller'
import { UserSeedService } from './user.seed'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [UserService, AuthService, UserSeedService],
  controllers: [UserController],
  exports: [UserService, AuthService],
})
export class UserModule {}
