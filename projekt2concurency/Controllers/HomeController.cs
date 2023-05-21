using System.Diagnostics;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Warehouse.Models;
using Newtonsoft.Json;
using Warehouse.Data;
using System.Security.Cryptography.X509Certificates;
using Microsoft.EntityFrameworkCore;
using System;

namespace Warehouse.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly SelectListContext _context;

        public HomeController(ILogger<HomeController> logger, SelectListContext _cont)
        {
            _logger = logger;
            _context = _cont;
        }

        public IActionResult Index()
        {
            List<WareHouseEntry> products = _context.products.ToList();
            return View(products);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        public ViewResult Create()
        {
            ViewBag.Category = new List<string>() { "liquid", "metal", "socks" };
            ViewBag.unit = new List<string>() { "kg", "pcs", "litre" };
            
            return View();
        }

        // POST: Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(WareHouseEntry nowy)
        {
            try
            {
                ViewBag.Category = new List<string>() { "liquid", "metal", "socks" };
                ViewBag.unit = new List<string>() { "kg", "pcs", "litre" };
                WareHouseEntry help = _context.products.FirstOrDefault(x => x.Id == nowy.Id);
                if(help != null)
                {
                    ModelState.AddModelError("", "Id must be unique");
                    return View(help);
                }
                _context.products.Add(nowy);
                _context.SaveChanges();
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                
                return View();
            }
        }

        // GET: Edit
        public ActionResult Edit(int id)
        {
            ViewBag.Category = new List<string>() { "liquid", "metal", "socks" };
            ViewBag.unit = new List<string>() { "kg", "pcs", "litre" };
            WareHouseEntry help = _context.products.FirstOrDefault(x => x.Id == id);
            return View(help);
        }

        // POST: Edit
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, WareHouseEntry entry)
        {
            ViewBag.Category = new List<string>() { "liquid", "metal", "socks" };
            ViewBag.unit = new List<string>() { "kg", "pcs", "litre" };
            //entry.version = Guid.NewGuid();
            var help = _context.products.Find(id);
            if(entry.version == help.version)
            {
                help.Name = entry.Name;
                help.Description = entry.Description;
                help.price = entry.price;
                help.Unit = entry.Unit;
                help.Category = entry.Category;
                help.version = Guid.NewGuid();
                _context.products.Update(help);
                _context.SaveChanges();
                return RedirectToAction(nameof(Index));
            }
            ModelState.AddModelError("", "concurency error");
            return View();
        }

        public IActionResult Delete(int id)
        {
            WareHouseEntry help = _context.products.FirstOrDefault(x => x.Id == id);
            return View(help);
        }

        // POST: Delete
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, WareHouseEntry entry)
        {
            try
            {
                WareHouseEntry item = _context.products.FirstOrDefault(x => x.Id == id);
                _context.products.Remove(item);
                _context.SaveChanges();
                return RedirectToAction("Index");
            }
            catch
            {
                ModelState.AddModelError("", "already deleted!");
                return View();
            }
        }

        public ActionResult CategoryView(string category)
        {
            return View(_context.products.Where(x => x.Category == category));
        }
    }
}




