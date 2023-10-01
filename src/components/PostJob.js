//create a postjob function with a form and using Editor from tiptap
import { Editor } from '@tiptap/react';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { CREATE_JOB_MUTATION } from '../graphql/mutations';

const PostJob = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [editor, setEditor] = useState(null);
    const [createJob] = useMutation(CREATE_JOB_MUTATION);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const content = editor.getHTML();
        await createJob({ variables: { title, description, content } });
        setTitle('');
        setDescription('');
        editor.commands.setContent('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <Editor
                editorProps={{ attributes: { class: 'editor' } }}
                onEditorReady={setEditor}
            />
            <button type="submit">Post Job</button>
        </form>
    );
};

export default PostJob;


