import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { initializeApp } from 'firebase/app';
import { collection, addDoc, getFirestore, getDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { getStorage, ref } from 'firebase/storage';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

const firebaseConfig = environment.firebaseConfig;
initializeApp(firebaseConfig);
const firestore = getFirestore();
const storage = getStorage();
const StorageRef = ref(storage);

export const saveUser = async (userid: number | undefined, token: string | undefined) => {
  if (!userid ||!token) {
    throw new Error("userid o token no pueden ser undefined");
  }

  return await addDoc(collection(firestore, "login"), {userid, token});
};

export const saveResult = async (UserId: number, TeacherId: number, Questions: [Question]) => {
  if (!UserId ||!TeacherId) {
    throw new Error("Both UserId and TeacherId must be defined.");
  }
  
  return await addDoc(collection(firestore, "evaluaciones"), {UserId, TeacherId, Questions});
}

export const getEvaluaciones = async () => {
  try {
      const querySnapshot = await getDocs(collection(firestore, "evaluaciones"));
      const evaluaciones = querySnapshot.docs.map(doc => doc.data());
      console.log("Evaluaciones data:", evaluaciones);
      return evaluaciones;
  } catch (error) {
      console.error("Error getting documents:", error);
      return [];
  }
};

export const getEvaluacionByUserIdAndTeacherId = async (userId: number, teacherId: number) => {
  try {
    const querySnapshot = await getDocs(query(collection(firestore, "evaluaciones"), where("UserId", "==", userId), where("TeacherId", "==", teacherId)));
    if (querySnapshot.empty) {
      // No se encontraron evaluaciones para el usuario y profesor dados
      return null;
    } else {
      // Solo se espera una evaluación con el par de userId y teacherId dados, por lo que tomamos la primera
      const evaluacion = querySnapshot.docs[0].data();
      console.log("Evaluación encontrada:", evaluacion);
      return evaluacion;
    }
  } catch (error) {
    console.error("Error al obtener la evaluación:", error);
    throw error;
  }
};



interface Question {
  PreguntaId: number,
  Pregunta: string,
  Ranking: number
}