export interface Cliente{
    id?: number,
    nombreCompleto: string;
    identificacion: number;
    edad: number;
    genero: "F"|"M"|"Otro";
    estado: boolean; 
    maneja: boolean;
    lentes: boolean;
    diabetico: boolean;
    otraEnfermedad: string;

}