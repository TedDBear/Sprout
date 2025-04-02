import {Button} from '@/components/ui/button'

export default function Header({clearGarden, saveGarden, loadGarden}) {
    // Create a hidden file input element that we'll use for loading files
    const handleLoadClick = () => {
        // Create a hidden file input element
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.json';
        fileInput.style.display = 'none';
        
        // Add event listener for when a file is selected
        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                loadGarden(e.target.files[0]);
            }
        });
        
        // Append the file input to the body, trigger click, then remove
        document.body.appendChild(fileInput);
        fileInput.click();
        document.body.removeChild(fileInput);
    };

      return (
        <div className="flex justify-between items-center mb-6 p-4 bg-white shadow-lg rounded-lg">
            <Button variant="outline">Back</Button>
            <h1 className="text-4xl font-extrabold text-green-800 tracking-wide">SPROUT</h1>
            <div className="space-x-2">
                <Button variant="outline" onClick={(event) => saveGarden(event)}>Save Garden...</Button>
                <Button variant="outline" onClick={handleLoadClick}>Load Garden...</Button>
                <Button variant="destructive" onClick={(event) => clearGarden(event)}>Clear Garden</Button>
            </div>
        </div>
    );
}