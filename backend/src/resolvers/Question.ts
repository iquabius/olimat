export const Question = {
  /**
   * Busca as alternativas relacionadas a uma questão.
   * @param parent instância da questão (Question)
   */
  choices(parent, _, { prisma }) {
    return prisma.question({ id: parent.id }).choices();
  },
  /**
   * Computa a url completa da imagem.
   * @param parent instância da questão (Question)
   */
  imageFullUrl(parent) {
    const filesHost = 'http://localhost:4000/files';

    return parent.imageUrl ? `${filesHost}/${parent.imageUrl}` : null;
  },
};
