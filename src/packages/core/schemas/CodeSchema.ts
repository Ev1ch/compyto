import validation from '@/validation';

const CodeSchema = validation.string().required().strict();

export default CodeSchema;
