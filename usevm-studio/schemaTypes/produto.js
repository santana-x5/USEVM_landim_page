// schemas/produto.js
// Cole este arquivo em: usevm-studio/schemas/produto.js
// Depois registre-o no index.js do schemas (veja SANITY_SETUP.md)

export default {
  name: 'produto',
  title: 'Produto',
  type: 'document',
  fields: [
    {
      name: 'nome',
      title: 'Nome do Produto',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'preco',
      title: 'Preço (R$)',
      type: 'number',
      validation: Rule => Rule.required().positive()
    },
    {
      name: 'categoria',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          { title: 'Feminino', value: 'feminino' },
          { title: 'Masculino', value: 'masculino' }
        ],
        layout: 'radio'
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'imagem',
      title: 'Foto do Produto',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required()
    },
    {
      name: 'disponivel',
      title: 'Disponível para venda?',
      type: 'boolean',
      initialValue: true,
      description: 'Desmarque para mostrar como ESGOTADO na loja'
    },
    {
      name: 'mensagemWhatsapp',
      title: 'Mensagem do WhatsApp',
      type: 'string',
      initialValue: 'Olá! Gostaria de adquirir uma peça.',
      description: 'Mensagem enviada quando o cliente clica em "Quero este"'
    }
  ],
  preview: {
    select: {
      title: 'nome',
      subtitle: 'preco',
      media: 'imagem',
      disponivel: 'disponivel'
    },
    prepare({ title, subtitle, media, disponivel }) {
      return {
        title: disponivel ? title : `❌ ESGOTADO — ${title}`,
        subtitle: subtitle ? `R$ ${subtitle.toFixed(2).replace('.', ',')}` : '',
        media
      }
    }
  }
}
