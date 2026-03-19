const posts = [
    {
        id: 1,
        name: "Missed Bus",
        content:
            "I missed the bus by two seconds and had to jog to work. The driver waved like that helped.",
    },
    {
        id: 2,
        name: "Coffee Spill",
        content:
            "I brought a fresh coffee to my desk and spilled it before the first sip. The keyboard survived somehow.",
    },
    {
        id: 3,
        name: "Wrong Meeting",
        content:
            "I joined a meeting ten minutes early and realized it was for another team. I stayed long enough to learn about warehouse software.",
    },
    {
        id: 4,
        name: "Grocery Math",
        content:
            "I went in for bread and left with snacks for a week. I still forgot the bread.",
    },
    {
        id: 5,
        name: "Late Night Fix",
        content:
            "I spent an hour debugging a bug that turned out to be a typo. It was humbling and effective.",
    },
];

exports.getPosts = (req, res, next) => {
    res.status(200).json({ posts: posts });
};

exports.createPost = (req, res, next) => {
    const name = req.body.name;
    const content = req.body.content;
    res.status(201).json({
        message: "Post created successfully",
        post: { id: new Date().toISOString(), name: name, content: content },
    });
};
