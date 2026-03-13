type Props = {
    params: Promise<{
        id: string;
    }>;
};

export default async function UserDetailPage({ params }: Props) {
    const { id } = await params;

    console.log("id:", id);

    return <p>id de orden: {id}</p>;
}