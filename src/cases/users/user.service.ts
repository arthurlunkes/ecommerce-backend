import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(
    username: string,
    email: string,
    password: string,
    role?: string,
  ) {
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
      role: (role as any) || 'user',
    })

    return this.userRepository.save(user)
  }

  async findByUsername(username: string) {
    return this.userRepository.findOne({
      where: { username },
    })
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
    })
  }

  async findById(id: string) {
    return this.userRepository.findOne({
      where: { id },
    })
  }

  async validatePassword(password: string, hash: string) {
    return bcrypt.compare(password, hash)
  }

  async findAll() {
    return this.userRepository.find()
  }
}
