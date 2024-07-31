import { IClientRepository } from '../IClient-repository'
import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  getCountFromServer,
  getDoc,
  doc,
  getDocs,
  query,
  limit,
  startAfter,
  orderBy,
  Timestamp,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import { InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { IRegisterClientDTO } from '../../../infra/validations/client/registerClientDTO'
import * as crypto from 'crypto'
import { IClient } from '../../../domain/IClient'

export class FirebaseClientRepository implements IClientRepository {
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

  async getAllRegisters(
    collectionID: string,
    lastDoc: number,
    range?: number | 'all',
  ): Promise<IClient[]> {
    const timestamp = Timestamp.fromMillis(lastDoc * 1000)

    const collectionRef = collection(
      this.db,
      `restaurants/${collectionID}/cadastrados`,
    )

    let q = query(
      collectionRef,
      orderBy('created_at'),
      limit(typeof range === 'number' ? range : 5),
      startAfter(timestamp),
    )

    if (range === 'all') {
      q = query(collectionRef, orderBy('created_at'), startAfter(timestamp))
    }

    const snapshot = await getDocs(q)

    const allDocs = snapshot.docs.map((doc) => {
      return doc.data()
    })

    return allDocs.filter(
      (data) => data.created_at.seconds !== lastDoc,
    ) as unknown as IClient[]
  }

  async checkIfContractorExists(collectionID: string) {
    const docRef = doc(this.db, 'restaurants', collectionID)
    const snapshot = await getDoc(docRef)

    if (!snapshot.data()) {
      throw new NotFoundException('Contratante não encontrado.', {
        description:
          'O contratante não foi encontrado, verifique o ID da coleção.',
      })
    }
    const contractor = snapshot.data() as { email: string; id: string }

    return {
      email: contractor.email,
      id: contractor.id,
    }
  }

  async getRegisteredCount(collectionID: string) {
    const colRef = collection(
      this.db,
      `restaurants/${collectionID}/cadastrados`,
    )
    const snapshot = await getCountFromServer(colRef)
    return snapshot.data().count
  }

  async registerClient(collectionID: string, client: IRegisterClientDTO) {
    const colRef = collection(
      this.db,
      `restaurants/${collectionID}/cadastrados`,
    )
    await addDoc(colRef, {
      ...client,
      id: crypto.randomUUID(),
      created_at: serverTimestamp(),
    })
    return true
  }

  async saveCSV(id: string, csv: ArrayBuffer) {
    try {
      const URL = `teste/${id}/testedesalvamento.csv`
      const storageRef = ref(this.storage, URL)

      console.log(csv)

      // const snapshot = await uploadBytes(storageRef, csv, {
      //   contentType: 'text/csv',
      // })
      //
      // return await getDownloadURL(snapshot.ref)

      const uploadTask = uploadBytesResumable(storageRef, csv)

      uploadTask.on('state_changed', (state) => {
        console.log(state)
      })

      return await uploadTask.then(async () => {
        const { snapshot } = uploadTask
        console.log('concluido')
        return await getDownloadURL(snapshot.ref)
      })
    } catch (e) {
      console.log(e)
      throw new InternalServerErrorException()
    }
  }
}
