import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, Strikethrough, Heading, Code } from "lucide-react"; // Replace icons as needed

interface TiptapProps {
  content: string;
  onUpdate: (content: string) => void;
}

const Tiptap = ({ content, onUpdate }: TiptapProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => {
      onUpdate(editor.getHTML());
    },
  });

  if (!editor) return null;

  const addToolbarButton = (
    onClick: () => void,
    isActive: boolean,
    Icon: React.FC,
    label: string
  ) => (
    <button
      onClick={onClick}
      className={`p-2 m-1 border rounded ${
        isActive ? "bg-blue-500 text-white" : "bg-gray-100"
      }`}
      title={label}
    >
      <Icon />
    </button>
  );

  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto">
      {/* Toolbar */}
      <div className="flex justify-start items-center space-x-2 mb-4">
        {addToolbarButton(
          () => editor.chain().focus().toggleBold().run(),
          editor.isActive("bold"),
          Bold,
          "Bold"
        )}
        {addToolbarButton(
          () => editor.chain().focus().toggleItalic().run(),
          editor.isActive("italic"),
          Italic,
          "Italic"
        )}
        {addToolbarButton(
          () => editor.chain().focus().toggleStrike().run(),
          editor.isActive("strike"),
          Strikethrough,
          "Strikethrough"
        )}
        {addToolbarButton(
          () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
          editor.isActive("heading", { level: 1 }),
          Heading,
          "Heading 1"
        )}
        {addToolbarButton(
          () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
          editor.isActive("heading", { level: 2 }),
          Heading,
          "Heading 2"
        )}
        {addToolbarButton(
          () => editor.chain().focus().toggleCode().run(),
          editor.isActive("code"),
          Code,
          "Code"
        )}
      </div>
    </div>
  );
};

export default Tiptap;
