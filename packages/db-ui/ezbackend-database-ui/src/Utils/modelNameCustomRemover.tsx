export default function modelNameCustomRemover(modelnames: string[]) {
  return modelnames.filter((name) => name.startsWith("db-ui/"));
}
