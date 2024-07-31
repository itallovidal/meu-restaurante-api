import { IContractorRepository } from '../IContractorRepository'
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
import { IContractorSchemaDTO } from '../../../infra/validations/contractor/ContractorSchema'
import { IPolitic } from '../../../domain/IContractor'

@Injectable()
export class FirebaseContractorRepository implements IContractorRepository {
  private db
  private storage

  constructor() {
    this.dbConnection()
  }

  dbConnection() {
    // objeto de configuracão do firebase build
    const firebaseConfig = {
      apiKey: 'AIzaSyBYQBbDEedm43eFOw6aVYcrGljya1Prs84',
      authDomain: 'projetoalpha-b5ee8.firebaseapp.com',
      projectId: 'projetoalpha-b5ee8',
      storageBucket: 'projetoalpha-b5ee8.appspot.com',
      messagingSenderId: '661461579263',
      appId: '1:661461579263:web:d938aba6b4e69a98ede3ca',
    }

    // objeto de configuracão do firebase de testes
    // const firebaseConfig = {
    //   apiKey: 'AIzaSyDwvyJTaEI7Wu11d77IU0DXfXig7Y1OHos',
    //   authDomain: 'projetoalpha-c8d5e.firebaseapp.com',
    //   projectId: 'projetoalpha-c8d5e',
    //   storageBucket: 'projetoalpha-c8d5e.appspot.com',
    //   messagingSenderId: '1021811883912',
    //   appId: '1:1021811883912:web:541bf8b257a284db89043d',
    // }

    // objeto de inicializacão do firebase
    const app = initializeApp(firebaseConfig)
    this.db = getFirestore()
    this.storage = getStorage(app)
  }

  async update(data: IContractorSchemaDTO, id: string) {
    if (data.id) {
      const docRef = doc(this.db, 'politicos', id)
      await updateDoc(docRef, data)
      return await this.getByID(data.id)
    }

    throw new BadRequestException('Erro no payload.', {
      description: 'Falta ID do usuário no payload.',
    })
  }

  delete() {}

  async create(data: IPolitic) {
    const usersCollection = collection(this.db, 'politicos')
    await addDoc(usersCollection, {
      ...data,
      created_at: serverTimestamp(),
    })

    return await this.getByID(data.id)
  }

  async getByID(id: string) {
    const colRef = collection(this.db, 'politicos')
    const q = query(colRef, where('id', '==', id))
    const snapshot = await getDocs(q)

    return {
      ...snapshot.docs[0].data(),
      collection_id: snapshot.docs[0].id,
    }
  }

  async login(email: string, password: string) {
    const colRef = collection(this.db, 'politicos')
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
    const URL = `test/${id}/${crypto.randomUUID()}.${fileType}`
    const storageRef = ref(this.storage, URL)

    const uploadTask = uploadBytesResumable(storageRef, image.buffer)

    return await uploadTask.then(async () => {
      const { snapshot } = uploadTask
      console.log('concluido')
      return await getDownloadURL(snapshot.ref)
    })
  }
}
