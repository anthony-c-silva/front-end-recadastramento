export function verificarMudancas(objetoSie:any, objetoPedido:any) {
    const keysSie = Object.keys(objetoSie);
    const keysPedido = Object.keys(objetoPedido);

    if (keysSie.length !== keysPedido.length) {
      return false;
    }

    for (const key of keysSie) {

      const valSie = objetoSie[key];
      const valPed = objetoPedido[key];

      if (valPed === null) {
        return false;
      }

      if (valPed !== valSie) {
        return true;
      }

    }

    return true;
}



export function getIconStatus(status:any){
  switch (status){
    case 'VERIFICAR_CODIGO':
        return 'mdi-email-alert-outline'
    case 'ABERTO':
        return 'mdi-lock-open'
    case 'PENDENTE_ASSINATURA':
        return 'mdi-draw'
    case 'CONCLUIDO':
        return 'mdi-clock-check'
    case 'DEFERIDO':
        return 'mdi-check-circle'
    case 'INDEFERIDO':
        return 'mdi-block-helper'
    case 'REAJUSTE':
        return 'mdi-account-alert'
  }
}

export function getColorStatus(status:any){
  switch (status){
    case 'VERIFICAR_CODIGO':
        return '#1085BB'
    case 'ABERTO':
      return '#1085BB'
    case 'PENDENTE_ASSINATURA':
      return '#FF5722'
    case 'CONCLUIDO':
      return '#FFC107'
    case 'DEFERIDO':
      return '#4CAF50'
    case 'INDEFERIDO':
      return '#D32F2F'
    case 'REAJUSTE':
      return '#D32F2F'
  }
}

export function getColorStatusQuasar(status:any){
  console.log(status)
  switch (status){
    case 'VERIFICAR_CODIGO':
        return 'blue-8'
    case 'ABERTO':
      return 'blue-8'
    case 'PENDENTE_ASSINATURA':
      return 'deep-orange'
    case 'CONCLUIDO':
      return 'amber-8'
    case 'DEFERIDO':
      return 'green-8'
    case 'INDEFERIDO':
      return 'red-8'
    case 'REAJUSTE':
      return 'red-8'
  }
}
