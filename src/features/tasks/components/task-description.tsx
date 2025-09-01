import { useState, useEffect } from "react";
import { PencilIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DottedSeparator } from "@/components/dotted-separator";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, Strikethrough, Heading, Code } from "lucide-react";
import { useUpdateTask } from "../api/use-update-task";
import { Task } from "../types";


interface TaskDescriptionProps {
  task: Task;
  onUpdate?: () => void;
}

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

      <div className="border p-4 rounded shadow">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export const TaskDescription = ({ task, onUpdate }: TaskDescriptionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(task.description);
  const { mutate, isPending } = useUpdateTask();

  const handleSave = () => {
    mutate(
      {
        json: { description: value },
        param: { taskId: task.$id },
      },
      {
        onSuccess: () => {
          if (onUpdate) onUpdate();
          setIsEditing(false);
        },
      }
    );
  };

  useEffect(() => {
    setValue(task.description);
  }, [task.description]);

  return (
    <div className="p-4 border border-red-950 rounded-lg">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">Description</p>
        <Button
          onClick={() => setIsEditing((prev) => !prev)}
          size="sm"
          variant="secondary"
        >
          {isEditing ? (
            <XIcon className="size-4 mr-2" />
          ) : (
            <PencilIcon className="size-4 mr-2" />
          )}
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </div>
      <DottedSeparator className="my-4" />

      {isEditing ? (
        <div className="flex flex-col gap-y-4">
          <Tiptap content={value ?? ""} onUpdate={setValue} />
          <Button
            size="sm"
            className="w-fit ml-auto"
            onClick={handleSave}
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      ) : (
        <div
          dangerouslySetInnerHTML={{
            __html:
              task.description ||
              "<span class='text-muted-foreground'>No description set</span>",
          }}
        />
      )}
    </div>
  );
};
