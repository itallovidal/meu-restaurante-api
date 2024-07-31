import { IRestaurantRepository } from '../IRestaurant-repository'
import { BadRequestException, Injectable } from '@nestjs/common'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import { initializeApp } from 'firebase/app'
import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore'
import { IRestaurantSchema } from '../../../infra/validations/restaurant/restaurant-schema'
import { IRestaurant } from '../../../domain/IRestaurant'

@Injectable()
export class FirebaseRestaurantRepository implements IRestaurantRepository {
  private db
  private storage

  constructor() {
    this.dbConnection()
  }

  dbConnection() {
    const firebaseConfig = {
      apiKey: 'AIzaSyAWW13o_KkOCQbRedhzJAumbAq0i88NlcQ',
      authDomain: 'meu-restaurante-9e770.firebaseapp.com',
      projectId: 'meu-restaurante-9e770',
      storageBucket: 'meu-restaurante-9e770.appspot.com',
      messagingSenderId: '612759714087',
      appId: '1:612759714087:web:189a0067dcfd90eeb6d102',
    }

    const app = initializeApp(firebaseConfig)
    this.db = getFirestore()
    this.storage = getStorage(app)
  }

  async update(data: IRestaurantSchema, id: string) {
    if (data.id) {
      const docRef = doc(this.db, 'restaurants', id)
      await updateDoc(docRef, data)
      return await this.getByID(data.id)
    }

    throw new BadRequestException('Erro no payload.', {
      description: 'Falta ID do usuário no payload.',
    })
  }

  async create(data: IRestaurant) {
    console.log(data)
    const usersCollection = collection(this.db, 'restaurants')
    await addDoc(usersCollection, {
      ...data,
      created_at: serverTimestamp(),
    })

    return await this.getByID(data.id)
  }

  async getByID(id: string) {
    const colRef = collection(this.db, 'restaurants')
    const q = query(colRef, where('id', '==', id))
    const snapshot = await getDocs(q)

    return {
      ...snapshot.docs[0].data(),
      collection_id: snapshot.docs[0].id,
    }
  }

  async login(email: string, password: string) {
    const colRef = collection(this.db, 'restaurants')
    const q = query(
      colRef,
      where('email', '==', email.toLowerCase()),
      where('senha', '==', password),
    )
    const snapshot = await getDocs(q)
    return {
      ...snapshot.docs[0].data(),
      collection_id: snapshot.docs[0].id,
    }
  }

  async storeFile(image: Express.Multer.File, id: string) {
    const fileType = image.mimetype.slice(6)
    const URL = `profile/${id}/${crypto.randomUUID()}.${fileType}`
    const storageRef = ref(this.storage, URL)

    const uploadTask = uploadBytesResumable(storageRef, image.buffer)

    return await uploadTask.then(async () => {
      const { snapshot } = uploadTask
      console.log('concluido')
      return await getDownloadURL(snapshot.ref)
    })
  }
}
