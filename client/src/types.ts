export interface CodeBlockItem {
  codeBlockId: string;
  name: string;
  templateCode: string;
  description?: string;
}

export type CodeBlockItems = CodeBlockItem[];
