using System.Linq;
using System.Web.Mvc;
using Blackstar;
using System.Threading.Tasks;

namespace dotnetSample.Controllers
{
    public class HomeController : Controller
    {
        public async Task<ActionResult> Index()
        {
            var client = new BlackstarClient("http://demo.blackstarcms.net");
            var content = await client.GetByTagAsync("blackstarpedia");
            return View(HomeModel.FromContentChunks(content));
        }   
    }

    public class HomeModel
    {
        public string mainHeading { get; set; }
        public string mainContent { get; set; }
        public string smallerHeading { get; set; }
        public string secondContent { get; set; }
        public string nav { get; set; }
        public string footer { get; set; }
        
        public static HomeModel FromContentChunks(ContentChunk[] chunks)
        {
            return new HomeModel
            {
                mainContent = ValueWithName(chunks, "main-content"),
                mainHeading = ValueWithName(chunks, "main-heading"),
                smallerHeading = ValueWithName(chunks, "smaller-heading"),
                secondContent = ValueWithName(chunks, "second-content"),
                nav = ValueWithName(chunks, "nav"),
                footer = ValueWithName(chunks, "footer"),
            };
        }

        private static string ValueWithName(ContentChunk[] chunks, string name)
        {
            return chunks.Single(chunk => chunk.Name == name).Value;
        }
    }
}