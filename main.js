// Máscara para CPF
function maskCPF(input) {
  let value = input.value.replace(/\D/g, '');
  value = value.replace(/(\d{3})(\d)/, '$1.$2');
  value = value.replace(/(\d{3})(\d)/, '$1.$2');
  value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  input.value = value;
}

// Máscara para telefone
function maskPhone(input) {
  let value = input.value.replace(/\D/g, '');
  value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
  value = value.replace(/(\d)(\d{4})$/, '$1-$2');
  input.value = value;
}

// Máscara para valores monetários
function maskCurrency(input) {
  let value = input.value.replace(/\D/g, '');
  value = (parseInt(value) / 100).toFixed(2);
  value = value.replace('.', ',');
  value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  input.value = 'R$ ' + value;
}

// Adicionar listeners para os campos
document.getElementById('cpf').addEventListener('input', function() {
  maskCPF(this);
});

document.getElementById('telefone').addEventListener('input', function() {
  maskPhone(this);
});

const currencyFields = ['renda', 'valorAluguel', 'valorIptu', 'condominio'];
currencyFields.forEach(field => {
  document.getElementById(field).addEventListener('input', function() {
    maskCurrency(this);
  });
});

// Função para formatar o texto do WhatsApp
function formatWhatsAppMessage(formData) {
  return `*Seguro Fiança PF Porto*
  
Nome: ${formData.get('nome')}
CPF: ${formData.get('cpf')}
Estado Civil: ${formData.get('estadoCivil')}
Email: ${formData.get('email')}
Profissão: ${formData.get('profissao')}
Renda Aproximada: ${formData.get('renda')}
Telefone: ${formData.get('telefone')}
Valor do Aluguel: ${formData.get('valorAluguel')}
Valor IPTU: ${formData.get('valorIptu')}
Condomínio: ${formData.get('condominio') || 'Não informado'}
Motivo da Locação: ${formData.get('motivoLocacao')}
Imóvel Pretendido: ${formData.get('imovelPretendido')}`;
}

// Handler do formulário
function handleSubmit(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const message = formatWhatsAppMessage(formData);
  const whatsappNumber = '13974034322';
  
  // Criar link do WhatsApp e redirecionar
  const whatsappUrl = `https://api.whatsapp.com/send?phone=55${whatsappNumber}&text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
  
  return false;
}
