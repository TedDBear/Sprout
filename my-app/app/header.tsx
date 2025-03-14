import {Button} from '@/components/ui/button'

export default function Header({clearGarden}) {
      return (
        <div className="flex justify-between items-center mb-6 p-4 bg-white shadow-lg rounded-lg">
            <Button variant="outline">Back</Button>
            <h1 className="text-4xl font-extrabold text-green-800 tracking-wide">SPROUT</h1>
            <div className="space-x-2">
                <Button variant="outline">New Garden</Button>
                <Button variant="outline">Save Garden...</Button>
                <Button variant="outline">Load Garden...</Button>
                <Button variant="destructive" onClick={(event) => clearGarden(event)}>Clear Garden</Button>
            </div>
        </div>
    );
}